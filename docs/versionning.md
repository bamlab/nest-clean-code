# Versionning

## Contributors

- Alix Bouloc
- Antoine Jubin

## Why

During developpement, you will have to change code that is used by client.

In order not to break things for those client, you will need to handle versionning.

We won't talk here about the various type of versionning, see the doc for this https://docs.nestjs.com/techniques/versioning

## Key steps

- Do versionning only if you break Open Close principles

Your interface should be open to extension (e.g. support new type for a given key in request object, add new key in response object, ... )
And close to modification (e.g. add new required parameter in request object ,remove a key in response object)

- Keep a clear interface for the client

- Explain what has changed

- If the model doesn't change, versionning should be in business logic
- If the model doesn't change, ...

## Mistakes to avoid

## Going further

- you can do versionning on the devops side by having older code running and adding redirection on specific instance with some routing rules

### Ressources

- Implementation exemple at Stripe - https://stripe.com/blog/api-versioning
- Versionning on protobuf, can be applyed to HTTP Rest API - https://cloud.google.com/apis/design/versioning
- Thoughts on DDD versionning - https://blog.ttulka.com/rethinking-api-versioning-with-domain-driven-design
- Roy Fielding, author of Rest says don't do versionning

- https://martinfowler.com/articles/enterpriseREST.html#versioning
- https://copyconstruct.medium.com/testing-microservices-the-sane-way-9bb31d158c16
- https://copyconstruct.medium.com/iterative-refactoring-of-apis-with-proxies-d78a2ba7e6ed
- https://smartlogic.io/blog/2012-12-12-developing-an-api/
