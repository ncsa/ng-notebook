# Example of Angular application embedded in Jupyter notebook

This project demonstrates how a workflow can embed an Angular application in a Jupyter notebook. The procedure involves the following steps:

1. **Building the Docker image**. From the top-level directory of this project, run `docker build -t ncsa/ng-notebook:latest -f ./docker/Dockerfile .` (your Docker installation might require you to run as `root` or with `sudo`). The Docker image contains the dependencies required for the next step.

2. **Simulating the workflow**. From the top-level directory of this project,
run `docker run --rm=true -v $(pwd):/hostmount/ ncsa/ng-notebook:latest` (as above, your Docker installation might require you to run as `root` or with `sudo`). This will execute code inside the Docker image created in the previous step. The code simulates a step in a real workflow by inserting data into an HTML file that also contains an Angular application.

3. **Viewing the output in a browser**. Look in the `output/` directory for a file called `index.html`, which was created by the previous step. You can open the file in a browser to run the Angular application. The data shown in the bar chart was created by the simulated workflow in the previous step, and the images that appear when hovering over bars in the chart are fetched from an external server on demand.

4. **Embedding the output in a notebook**. Navigate to [our live demo notebook](https://colab.research.google.com/drive/1Td6I_ow35AleoYV_59l2D5HgVRK-d_gh?usp=sharing) and follow the instructions there to view the Angular application running inside a notebook.
