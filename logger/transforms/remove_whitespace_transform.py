#!/usr/bin/env python3
import sys
from os.path import dirname, realpath

sys.path.append(dirname(dirname(dirname(realpath(__file__)))))
from logger.transforms.transform import Transform  # noqa: E402


class RemoveWhitespaceTransform(Transform):
    """ Removes trailing whitespace from a string record
    and removes unncessary whitespace between data values,
    resulting in only one whitespace between each data value."""
    def __init__(self):
        pass

    def transform(self, record):
        if not record:
            return None

        record = record.strip()
        return " ".join(record.split())
