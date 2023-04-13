import RemoteRoute from "../components/RemoteRoute";

const isProd = process.env.NODE_ENV === "production";

const homeRemote: RemoteRoute = {
    label: "Home",
    path: "/home",
    remoteUrl: isProd ? "https://d2yt125o7sij9g.cloudfront.net/home/remoteEntry.js" : "http://localhost:9001/remoteEntry.js",
    scope: "home",
    module: "./HomePage",
};

const catRemote: RemoteRoute = {
    label: "Cat",
    path: "/cat",
    remoteUrl: isProd ? "https://d2yt125o7sij9g.cloudfront.net/cat/remoteEntry.js" : "http://localhost:9002/remoteEntry.js",
    scope: "cat",
    module: "./CatPage",
};

const dogRemote: RemoteRoute = {
    label: "Dog",
    path: "/dog",
    remoteUrl: isProd ? "https://d2yt125o7sij9g.cloudfront.net/dog/remoteEntry.js" : "http://localhost:9003/remoteEntry.js",
    scope: "dog",
    module: "./DogPage",
};

const remotePages = [homeRemote, catRemote, dogRemote];

export default remotePages;
