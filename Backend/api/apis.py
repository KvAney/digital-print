
from utils.Videotemplate import Video

from utils.mappings import load_category_mappings
from starter import get_authenticated_service
# get your utube liked video

# Step 2: Fetch liked videos
def get_liked_videos(youtube):
    next_page_token = None
    liked_videos = []
    while True:
        request = youtube.videos().list(
            part="snippet,contentDetails,statistics",
            myRating="like",
            maxResults=50,
            pageToken=next_page_token
        )
        response = request.execute()   
        liked_videos.extend(response.get("items", []))
        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break
    
    return liked_videos

def remove_like(video_id):
    try:
        youtube = get_authenticated_service()
        request = youtube.videos().rate(
            id=video_id,
            rating="none"
        )
        request.execute()
        print(f"Removed like from video: {video_id}")
    except Exception as e: 
        return e

    return 1

# Main execution
def getDetails():
    print('Starting the data Retrieval')
    youtube = get_authenticated_service()
    # We need to create a delta file to monitor changes.
    liked_videos = get_liked_videos(youtube)
    print('Got liked_videos')

    mapping = load_category_mappings()

    categorySpecified = {}
    for item in liked_videos:
        cat = mapping.get(item['snippet']['categoryId'],item['snippet']['categoryId'])
        id = item['id']
        title = item['snippet']['title']
        description = item['snippet']['description']
        category = cat
        
        thumbnailUrl =item['snippet']['thumbnails']['default']['url']
        
        VideoObj = Video(id,title,description,category,thumbnailUrl)
        if  cat  in categorySpecified.keys():
            categorySpecified[cat].append(VideoObj.to_dict())
        else:
            categorySpecified[cat] = [VideoObj.to_dict()]
    return categorySpecified
    

    # Example: Remove like from the first video
    # if liked_videos:
    #     video_id_to_remove = liked_videos[0]['id']
    #     user_input = input(f"\nDo you want to remove like from \"{liked_videos[0]['snippet']['title']}\"? (y/n): ")
    #     if user_input.lower() == 'y':
    #         remove_like(youtube, video_id_to_remove)
