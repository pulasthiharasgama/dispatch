import time
import os

from django.conf import settings

def generate_signed_url(path, content_type, expires_after_seconds=60):

    from google.cloud import storage

    obj = os.path.join(settings.GS_LOCATION, path)

    if settings.LOCAL_DEV:
        dirname = os.path.dirname
        ##############################################################################
        # Ensure you have a valid service-account json key file and set its path below
        ##############################################################################
        key_file = os.path.join('/', 'ubyssey.ca', 'ubyssey.ca', 'gcs-local.json') 
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=key_file
        client = storage.Client().from_service_account_json(key_file)
    else:
        client = storage.Client()
    
    bucket = client.get_bucket(settings.GS_STORAGE_BUCKET_NAME)
    blob = storage.Blob(obj, bucket)

    expiration_time = int(time.time() + expires_after_seconds)

    return blob.generate_signed_url(
        expiration_time,
        method='PUT',
        content_type=content_type
    )
