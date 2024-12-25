![Preview](./public/preview-4x3.png)

Demo Blog website built with Next.js and Appwrite.

## Getting Started

1. Clone the repository

```sh
git clone https://github.com/ChiragAgg5k/demo-blog-appwrite-nextjs
cd demo-blog-appwrite-nextjs
```

2. Install dependencies

```sh
pnpm install
```

You can also use `npm` or `yarn` instead of `pnpm`.

3. Create a `.env.local` file in the root directory and add the following environment variables:

```sh
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your-appwrite-project-id>
```

More information on how to setup Appwrite can be found in the [docs](./docs/appwrite.md).

4. Run the development server

```sh
pnpm dev
```

Additionally, you can change some settings in [constants.ts](./src/lib/constants.ts) to customize the blog.

## Running Appwrite Locally

1. Install and run the Appwrite Image.

```sh
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:1.6.0
```

2. Change the `APPWRITE_CLOUD_ENDPOINT` in [constants.ts](./src/lib/constants.ts) to `http://localhost/v1`.

3. Appwrite should be running on `http://localhost:8000`.

4. Follow the instructions in [appwrite.md](./docs/appwrite.md) to create the collections and setup the database.

## Contributing

Contributions are always welcome! Checkout the [CONTRIBUTING.md](./CONTRIBUTING.md) file for more information.

---

Made with ❤️ by [Chirag Aggarwal](https://www.chiragaggarwal.tech/).
