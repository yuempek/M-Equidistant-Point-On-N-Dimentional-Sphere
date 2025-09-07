# M Equidistant Point On N Dimentional Sphere
The code iterates M Equidistant Point On N-Dimentional Sphere

We assume that $R$ is the radius of N-Dimentional Sphere, and $M$ random point on it. <br>
For every point, it is calculated total force on the point. In theory total force must be zero when the points distrubute equidistantly.
If calculation run iteratives, total force nears to zero.  
<br>
Distance Vector of points

$$
\vec{P_{ij}} = P_i - P_j
$$

Unit Vector of Distance Vector

$$
\hat{P_{ij}} = \frac{\vec{P_{ij}}}{\|\vec{P_{ij}}\|}
$$

The formula for the relationship between force and distance. If the distance is equal to zero, the force will be 1. Otherwise, the force will decrease logarithmically with distance. $k$ is the adjusting value.
[Curve Visualization](https://graphtoy.com/?f1(x,t)=pow(1/exp(x),%200.5)) <br>
Formula : 

$$
F_{ij} = {e^{-k\|\vec{P_{ij}}\|}}
$$

Total force on a point

$$
\vec{D_i} = \sum^{M}_{i\ne{j}}F_{ij}\hat{P_{ij}}
$$

Last position of point

$$
P^{'}_i = P_i + \vec{D_i}
$$

Relocate to on sphere

$$
P_i = \frac{P^{'}_i}{\|P^{'}_{i}\|}R
$$
