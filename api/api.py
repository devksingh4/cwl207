from flask import Flask, jsonify, request

app = Flask(__name__)

mapping = None
reverse_mapping = None
predecessors = None
dist_matrix = None
actor_info_df = None
import json
import numpy as np
import pandas as pd
with open("mapping.json") as file:
    mapping = json.load(file)
with open("predecessors.npy", "rb") as file:
    predecessors = np.load(file)
with open("dist_matrix.npy", "rb") as file:
    dist_matrix = np.load(file)
reverse_mapping = dict([(value, key) for key, value in mapping.items()])
actor_info_df = pd.read_csv('actor_info.csv')

def get_path(Pr, i, j):
    """Gets the path between 2 IDs"""
    i = mapping[i]
    j = mapping[j]
    path = [j]
    k = j
    while Pr[i, k] != -9999:
        path.append(Pr[i, k])
        k = Pr[i, k]
    return list(map(lambda x: reverse_mapping[x], path[::-1]))

@app.route('/distance', methods=['GET'])
def get_distance():
    root = request.args.get('root')
    target = request.args.get('target')
    p = get_path(predecessors, root, target)
    names_out = list(map(lambda x: (actor_info_df[actor_info_df['nconst'] == x])['primaryName'].values[0], p))
    return jsonify(names_out)


if __name__ == '__main__':
    app.run()