import yaml
with open("./commons/mappings.yaml") as stream:
            mappings = ( yaml.safe_load(stream))
cat = "19"
print( mappings.get(cat,cat))
