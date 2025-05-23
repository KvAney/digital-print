import yaml,os
def load_category_mappings():
    path = os.path.join(os.path.dirname(__file__), '..', 'data', 'mappings.yaml')
    with open(path,"r") as stream:
            try:
                mapping = yaml.safe_load(stream)
            except yaml.YAMLError as exc:
                print(exc)
    return mapping