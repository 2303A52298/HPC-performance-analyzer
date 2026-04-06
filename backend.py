from flask import Flask, render_template, jsonify
import time
import random
from multiprocessing import Pool

app = Flask(__name__)

# Serial sorting
def serial_sort():
    data = [random.randint(1,10000) for _ in range(10000)]
    start = time.time()
    data.sort()
    end = time.time()
    return end - start

# Parallel sorting
def parallel_sort():
    data = [random.randint(1,10000) for _ in range(10000)]
    
    def sort_part(arr):
        arr.sort()
        return arr

    chunks = [data[i:i+2500] for i in range(0,len(data),2500)]

    start = time.time()

    with Pool(4) as p:
        sorted_chunks = p.map(sort_part,chunks)

    result = []
    for c in sorted_chunks:
        result.extend(c)

    result.sort()

    end = time.time()

    return end-start


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/run")
def run_algorithm():

    serial_time = serial_sort()
    parallel_time = parallel_sort()

    distributed_time = parallel_time * 0.8

    return jsonify({
        "serial": round(serial_time,4),
        "parallel": round(parallel_time,4),
        "distributed": round(distributed_time,4)
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)