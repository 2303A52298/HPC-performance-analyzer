import multiprocessing

def sort_part(data):
    return sorted(data)

def parallel_sort(arr):

    cores = multiprocessing.cpu_count()
    size = len(arr) // cores

    chunks = []

    for i in range(cores):
        start = i * size
        end = (i + 1) * size
        chunks.append(arr[start:end])

    pool = multiprocessing.Pool(cores)
    sorted_chunks = pool.map(sort_part, chunks)

    result = []
    for chunk in sorted_chunks:
        result.extend(chunk)

    return sorted(result)