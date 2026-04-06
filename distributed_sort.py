import random
import time
from multiprocessing import Process

def worker(arr):
    arr.sort()

def run_distributed():

    arr = [random.randint(0,100000) for i in range(200000)]

    size = len(arr)//4
    chunks = [arr[i*size:(i+1)*size] for i in range(4)]

    processes = []

    start = time.time()

    for chunk in chunks:
        p = Process(target=worker,args=(chunk,))
        p.start()
        processes.append(p)

    for p in processes:
        p.join()

    end = time.time()

    return end - start