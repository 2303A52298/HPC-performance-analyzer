import random
import time
from multiprocessing import Pool

def sort_chunk(chunk):
    return sorted(chunk)

def run_parallel():

    arr = [random.randint(0,100000) for i in range(200000)]

    chunks = 4
    size = len(arr)//chunks

    split = [arr[i*size:(i+1)*size] for i in range(chunks)]

    start = time.time()

    with Pool(chunks) as p:
        p.map(sort_chunk, split)

    end = time.time()

    return end - start