from flask import Flask, render_template, request, jsonify
import time
import random

from serial_sort import serial_sort
from parallel_sort import parallel_sort
from distributed_sort import distributed_sort

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_algorithm():

    size = int(request.json["size"])

    data = [random.randint(1,10000) for _ in range(size)]

    start = time.time()
    serial_sort(data.copy())
    serial_time = time.time() - start

    start = time.time()
    parallel_sort(data.copy())
    parallel_time = time.time() - start

    start = time.time()
    distributed_sort(data.copy())
    distributed_time = time.time() - start

    return jsonify({
        "serial": serial_time,
        "parallel": parallel_time,
        "distributed": distributed_time
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)