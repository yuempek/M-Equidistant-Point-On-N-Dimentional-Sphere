function P = equidistant(N, M, K, Random)
% P = equidistant(N, M, K)
% N: Dimension
% M: Number of points
% K: Iteration count
% R: Random
% P(1,:) is fixed as [1 0 0 ... 0]
% Output: M x N matrix (each row is a point)

if nargin < 3
    K = 10;
end

if nargin < 4
    Random = false;
end

% Initialize points randomly (normalized to unit sphere)
P = rand(M, N) * 2 - 1;
P = normalizeRows(P);

% Set the first point as fixed
%%% ***
if ~Random
    P(1,:) = [1, zeros(1, N-1)];
end

for iter = 1:K
    PP = zeros(M, N); % New positions

    I = 1;
    
    % Keep the first point fixed
    %%% ***
    if ~Random
        PP(1,:) = P(1,:);
        I = 2;
    end

    %%% ***
    for i = I:M  % Skip the first point
        D = zeros(1, N);

        for j = 1:M
            if i == j
                continue;
            end

            d = P(i,:) - P(j,:);
            dr = norm(d);

            if dr < 1e-4
                d = rand(1, N) * 2 - 1;
                dr = norm(d);
            end

            d = d / dr;
            F = actionForce(dr) * 10;

            D = D + d * F;
        end

        new_p = P(i,:) + D;
        PP(i,:) = new_p / norm(new_p);
    end

    P = PP;
end

end

%% Helper Functions

function F = actionForce(r)
F = (1 / exp(r)) ^ 0.5;
end

function Pn = normalizeRows(P)
Pn = P ./ vecnorm(P, 2, 2);
end
