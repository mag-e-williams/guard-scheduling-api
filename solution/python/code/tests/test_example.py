
# I'm using a pytest text fixture to test the endpoint directly.
# Feel free to seperate out the implementation from the fast endpoint and just test that.
# I.e. adding a hello_world_impl function that's invoked by the hello_world endpoint. And just testing that function.
def test_hello_world(client):
    """Example test."""

    rv = client.get('/hello')
    assert b'Hello World' in rv.data