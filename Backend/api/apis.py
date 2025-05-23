
from Backend.utils.Videotemplate import Video

from Backend.utils.mappings import load_category_mappings
from Backend.starter import get_authenticated_service
# get your utube liked video

# Step 2: Fetch liked videos
def get_liked_videos(youtube):
    request = youtube.videos().list(
        part="snippet,contentDetails,statistics",
        myRating="like",
        maxResults=25
    )
    response = request.execute()   
    
    return response.get("items", [])

def remove_like():
    video_id = request.get('video_id')
    youtube = get_authenticated_service()
    request = youtube.videos().rate(
        id=video_id,
        rating="none"
    )
    request.execute()
    print(f"Removed like from video: {video_id}")

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
    print(categorySpecified)
    return categorySpecified
    

    # Example: Remove like from the first video
    # if liked_videos:
    #     video_id_to_remove = liked_videos[0]['id']
    #     user_input = input(f"\nDo you want to remove like from \"{liked_videos[0]['snippet']['title']}\"? (y/n): ")
    #     if user_input.lower() == 'y':
    #         remove_like(youtube, video_id_to_remove)
