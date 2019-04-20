# cronjob-manager
========================

![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/edmur/cronjob-manager.svg)
![Docker Cloud Automated build](https://img.shields.io/docker/cloud/automated/edmur/cronjob-manager.svg)
![License](https://img.shields.io/github/license/rumd3x/cronjob-manager.svg)

![Dashboard](docs/dashboard.png)

## Whats is cronjob-manager?

The aim for this project is for dockerized environments. Containerized tasks asks for a containerized manager.

## Usage

You will probably want your tasks to persist after container recreation. So create a volume.
```sh
$   docker volume create cronmanager-data
```

Now run the image. You will also want the job manager to access your other containers, to manager them, so pass the `/var/run/docker.sock` as a volume too.
```sh
$   docker run \
    -p 80:80
    -v cronmanager-data:/usr/src/app/.node-persist
    -v /var/run/docker.sock:/var/run/docker.sock
    edmur/cronjob-manager
```

The container also exposes port `80` to the web interface and API, so forward that port to a port on your host.

## API

The web interface uses a REST API on the back-end that can also be called manually.

- `GET` Jobs
```
http://your-host/api/jobs
```

## License

This project is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
