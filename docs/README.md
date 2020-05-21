# Ciashop Adapter Aux for NOX ERP integrations.

Generates random numeric ids between an initial value and the int limit and update then to the customerId field of Client entities. Needed due to the exclusive use of numeric ids by the NOX ERP.

## Configuration

1. Create in the client entitie a field named customerId. The field must be a long, filterable, searchable and you must allow it to be edited without credentials. 

2. Create an index with the following properties. 
    - Name: AlternateKeyCustomerId
    - Unique values: True
    - Data entity: Clients
    - Fields: customerId

3. Publish the index and the client entity

4. Install this app to your store with:
```sh
vtex install vtex.nox-to-adapter-@0.x
```
5. Navigate to the configuration portion of the app in `/admin/nox-to-adapter` and set the starting range of generated ids. This menu can be found inside the customer area in the side menu.

6. Migrate all of the store customers.

7. Request that the id updating procedure be executed by @everton.ataide on Slack

8. Create a new trigger following these instructions:
    - Name: GenerateCustomerId
    - Data Entity: Client
    - Status: Enabled

    Rules:
    - Trigger rule: Um registro for inserido

    Schedule:
    - Run ASAP.

    If positive:
    - Action: Send an HTTP request.

    Request Data:
    - Url: https://{accountName}.{environment}.com/_v/customerId
           Ex: https://c2v01.myvtex.com/_v/customerId
    - Method: POST

    Content as Json:    
    ```json
    {
        "id": "{!id}"
    }
    ```

And you are done. All new customer now will have and random numeric id on the customerId field, making integration possible.