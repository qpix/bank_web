#!/usr/bin/python3

import sys

def epoch():
    from calendar import timegm
    from time import gmtime
    return timegm(gmtime())

def create_token(account, time = None):
    from hashlib import sha224

    if not time:
        time = epoch()

    return sha224((account + str(time)).encode('UTF-8')).hexdigest()

def create_challenge(account, time = None):
    challenge = str(int(create_token(account, time), 16) % 1000000)
    return '0' * (6 - len(challenge)) + challenge

print(create_challenge(sys.argv[1], sys.argv[2]), end='')
