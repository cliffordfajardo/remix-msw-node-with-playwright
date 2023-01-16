# Demo: Using mswjs to create serverside & client side mocks + work on your app offline


### Demo Video
https://user-images.githubusercontent.com/6743796/210154192-580e9f19-7be8-4f72-82a5-5152a7a6e313.mp4

demo video showcases:
- making an API call to example.com, and MSW intercepting the request and returning a response.
- running playwright test suite, it runs my app as a user would, fetches data, but recieved the mocked responses from MSW

### Highlights
- run your E2E/Integration test suite faster by using MSW inside of your node server
    - API responses are fast b/c data is local, no need to go to external machine etc
- ability to share your handler code on the server or browser
    - MSW node initialization
        - in this app, all data fetching happens through the remix server, so this is why we initialize MSW there instead of our web browser
    - MSW browser initialization
        - you could use the same handlers in the browser & those would be useful if wanted to test a single component in isolation with data from an API (which MSW would return)
- work entirely offline on your app with the help of MSW 
    - Example: you're working with a 3rd party API & its down or you don't want to get rate limited, so you create an MSW handler to intercept requests to that particular URL
    - Example: you're going to travel & have no internet, so you create an MSW handler to prepare for offline coding


## Questions ❓❔
Feel free to ask questions in the discussion thread here to help folks in the community:
https://github.com/remix-run/remix/discussions/4982



## Development
From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.


## Integration/E2E tests

```
# if you want to view playwright visually
npm run playwright:visualize 

# if want to run playwright headlessly
npm run playwright 
```

Run the app in production mode:

```sh
npm start
```

