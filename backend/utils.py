from datetime import datetime

def print_statement(*args):
    # logger = logging.getLogger(__name__)
    # logger.debug(args)
    print(datetime.now(),args, flush=True)



def find_largest_number(numbers):
    if not numbers:
        return None  # Return None if the list is empty
    largest_number = numbers[0]
    for number in numbers:
        if number > largest_number:
            largest_number = number
    
    return largest_number