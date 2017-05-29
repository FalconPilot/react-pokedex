# React Pokedex

I created this project to get used to ReactNative. I didn't know much about mobile development, and I was learning how to use ReactJS, and so I did the math and henceforth checked ReactNative.

# PokeAPI

Big kudos to http://pokeapi.co/ for providing the Pokemon API as well as the Pokemon sprites !

# How do I try it out ?

If you have an iOS or an Android emulator as well as React-native CLI, you can use `react-native run-android` or `react-native run-ios` in the project directory once the emulator is up and running. Technically, the iOS and Android versions should both work fine, but be wary that I didn't have any way of testing the iOS version on my side. Though the source files are the same, so it really shouldn't be a problem. If you run into any problem with any of the version, don't hesitate to drop an issue.

# A Pokedex to learn ReactNative ? Why ?

If you think about it, a Pokedex is a handheld, touchscreen device that displays informations that it either has stored in a database, either gets from an API (we don't know that precisely). So to make an interesting Pokedex, you need to make an app that

- Compiles to a mobile device
- Fetches, treat and renders information

That made a Pokedex the most interesting choice to get a shot at ReactNative. Plus, for someone as interested in web development as I am, having a way to use ReactJS for mobile development was a huge plus.

# How does it operate ?

Pretty simply, actually. It just fetches the pokemon list from the PokeAPI, and stocks the data in the built-in AsyncStorage provided by ReactNative (this is done to prevent having to send tons of new requests each time you open the app. You only load the pokemon list from the API once !). Pokemons are only loaded as you touch them, sending a request to load its data. Finally, it renders it once the data has been fetched. Really, it's as simple as it gets, but that's what made it an interesting project to learn the language in the first place.

# But there are already mobile Pokedex out there !

The intent of the project isn't to make something completely new, but to learn the language. And in that aspect, it did the job right - having to use AsyncStorage, quite a lot of different kinds of ReactNative components, a public API, the ReactNative StyleSheet component... It really requires to be polyvalent to avoid screwing things up, and that's what makes it a perfect learning project in my opinion.