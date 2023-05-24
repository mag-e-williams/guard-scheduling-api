import pytest

from app import server

# I am using a pytest fixture here to directly test the api endpoint.
# You don't have to take this approach and can also seperate out the implementation from the api call and test that directly.
# I.e. have a hello_world_impl() function that's called by hello_world, and just test that method.
@pytest.fixture
def client():
    server.app.config['TESTING'] = True

    with server.app.test_client() as client:
        yield client 
