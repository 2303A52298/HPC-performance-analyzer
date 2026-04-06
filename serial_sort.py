import random
import time

def run_serial():

    arr = [random.randint(0,100000) for i in range(200000)]

    start = time.time()

    arr.sort()

    end = time.time()

    return end - start