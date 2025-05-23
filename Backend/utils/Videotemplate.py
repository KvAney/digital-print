class Video:
    def __init__(self,id,title,description,category,thumbnailUrl   ):
        self.thumbnailUrl = thumbnailUrl;
        self.id = id
        self.title = title
        self.description = description
        self.category = category
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'thumbnailUrl': self.thumbnailUrl
        }