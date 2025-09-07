# M Equidistant Points on an N-Dimensional Sphere

This code iteratively computes the positions of $M$ equidistant points on an $N$-dimensional sphere.

We assume that $R$ is the radius of the $N$-dimensional sphere, and that there are $M$ random points distributed on it. For each point, the total force acting on it is calculated. In theory, the total force should approach zero when the points are distributed equidistantly. Through iterative calculations, the total force converges to zero as the points settle into their optimal configuration.

### Distance Vector Between Points

The distance vector between points $P_i$ and $P_j$ is given by:

$$
\vec{P_{ij}} = P_i - P_j
$$

### Unit Vector of the Distance Vector

The unit vector in the direction of the distance vector is:

$$
\hat{P_{ij}} = \frac{\vec{P_{ij}}}{\|\vec{P_{ij}}\|}
$$

### Force-Distance Relationship

The force between two points is a function of their distance. When the distance is zero, the force is 1. Otherwise, the force decreases exponentially as the distance increases. The constant $k$ is a scaling factor that adjusts the rate of decay. A graphical representation of this relationship can be found [here](https://graphtoy.com/?f1(x,t)=pow(1/exp(x),%200.5)&).

The formula for the force is:

$$
F_{ij} = e^{-k\|\vec{P_{ij}}\|}
$$

### Total Force on a Point

The total force acting on point $P_i$ is the sum of the forces exerted by all other points:

$$
\vec{D_i} = \sum_{i \neq j}^{M} F_{ij} \hat{P_{ij}}
$$

### Updated Position of a Point

The new position of point $P_i$ after considering the total force is:

$$
P_i^{'} = P_i + \vec{D_i}
$$

### Relocation on the Sphere

To ensure that the points remain on the surface of the sphere, we normalize the new position and scale it by the radius $R$:

$$
P_i = \frac{P_i^{'}}{\|P_i^{'}\|} R
$$

### [Live Demo](https://editor.p5js.org/yuempek.junk/full/hjRi0HIbM)
