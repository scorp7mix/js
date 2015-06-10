import json

dicJson = {}
yourRes = yourRes

with open('static/data.json', 'r') as past_json:
    dicJson = json.load(past_json)
    past_json.close()

dicJson['last_result'] = yourRes

if (yourRes > dicJson['best_result']):
    dicJson['best_result'] = yourRes

with open('static/data.json', 'w') as json_data:
    json.dump(dicJson, json_data)
    json_data.close()
