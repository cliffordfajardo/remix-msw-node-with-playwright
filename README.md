# Demo: Using mswjs to create serverside & client side mocks + work on your app offline


### Demo Video
https://user-images.githubusercontent.com/6743796/210154192-580e9f19-7be8-4f72-82a5-5152a7a6e313.mp4

demo video showcases:
- making an API call to example.com, and MSW intercepting the request and returning a response.
- running playwright test suite, it runs my app as a user would, fetches data, but recieved the mocked responses from MSW

### Highlights
- work entirely offline on your app with the help of MSW (as long as you setup the handlers before going offline)
- run your E2E/Integration test suite thats powered by MSW a lot faster by using MSW
- ability to share your handler code on the server or browser


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

