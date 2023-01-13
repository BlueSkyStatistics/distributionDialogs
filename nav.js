const nav = {
    "name": "Distribution",
    "tab": "distribution",
    "buttons": [
        {
            "name": "Beta",
            "icon": "icon-beta",
            "children": [
                "./Continuous/betaDistribution",
                "./Continuous/betaProbabilities",
                "./Continuous/betaQuantiles",
                "./Continuous/sampleBetaDistribution"
            ]
        },
        {
            "name": "Binomial",
            "icon": "icon-binary-code",
            "children": [
                "./Discrete/binomialDistribution",
                "./Discrete/binomialProbabilities",
                "./Discrete/binomialQuantiles",
                "./Discrete/binomialTailProbabilities",
                "./Discrete/sampleBinomialDistribution"
            ]
        },                
        {
            "name": "Cauchy",
            "icon": "icon-c",
            "children": [
                "./Continuous/cauchyDistribution",
                "./Continuous/cauchyProbabilities",
                "./Continuous/cauchyQuantiles",
                "./Continuous/sampleCauchyDistribution"
            ]
        },
        {
            "name": "Chi-squared",
            "icon": "icon-chi_squared",
            "children": [
                "./Continuous/chisquaredDistribution",
                "./Continuous/chisquaredProbabilities",
                "./Continuous/chisquaredQuantiles",
                "./Continuous/sampleChisquaredDistribution"
            ]
        },
        {
            "name": "Exponential",
            "icon": "icon-letter-e",
            "children": [
                "./Continuous/exponentialDistribution",                
                "./Continuous/exponentialProbabilities",
                "./Continuous/exponentialQuantiles",
                "./Continuous/sampleExponentialDistribution"
            ]
        },
        {
            "name": "F",
            "icon": "icon-f",
            "children": [
                "./Continuous/fDistribution",
                "./Continuous/fProbabilities",
                "./Continuous/fQuantiles",
                "./Continuous/sampleFDistribution"
            ]
        },
        {
            "name": "Gamma",
            "icon": "icon-gamma",
            "children": [
                "./Continuous/gammaDistribution",
                "./Continuous/gammaProbabilities",
                "./Continuous/gammaQuantiles",
                "./Continuous/sampleGammaDistribution"
            ]
        },
        {
            "name": "Geometric",
            "icon": "icon-area-chart",
            "children": [
                "./Discrete/geometricDistribution",
                "./Discrete/geometricProbabilities",
                "./Discrete/geometricQuantiles",
                "./Discrete/geometricTailProbabilities",
                "./Discrete/sampleGeometricDistribution"
            ]
        },                
        {
            "name": "Gumbel",
            "icon": "icon-gumbel",
            "children": [
                "./Continuous/gumbelDistribution",
                "./Continuous/gumbelProbabilities",
                "./Continuous/gumbelQuantiles",
                "./Continuous/sampleGumbelDistribution"
            ]
        },
        {
            "name": "Hypergeometric",
            "icon": "icon-curve",
            "children": [
                "./Discrete/hypergeometricDistribution",                
                "./Discrete/hypergeometricProbabilities",
                "./Discrete/hypergeometricQuantiles",
                "./Discrete/hypergeometricTailProbabilities",
                "./Discrete/sampleHypergeometricDistribution"
            ]
        },                 
        {
            "name": "Logistic",
            "icon": "icon-logistic_white_comp",
            "children": [
                "./Continuous/logisticDistribution",                
                "./Continuous/logisticProbabilities",
                "./Continuous/logisticQuantiles",
                "./Continuous/sampleLogisticDistribution"
            ]
        },
        {
            "name": "Lognormal",
            "icon": "icon-log-normal-distribution",
            "children": [
                "./Continuous/lognormalDistribution",
                "./Continuous/lognormalProbabilities",
                "./Continuous/lognormalQuantiles",
                "./Continuous/sampleLognormalDistribution"
            ]
        },
        {
            "name": "Negative Binomial",
            "icon": "icon-negtive-binary-code",
            "children": [
                "./Discrete/negativeBinomialDistribution",
                "./Discrete/negativeBinomialProbabilities",
                "./Discrete/negativeBinomialQuantiles",
                "./Discrete/negativeBinomialTailProbabilities",
                "./Discrete/sampleNegativeBinomialDistribution"
            ]
        },                 
        {
            "name": "Normal",
            "icon": "icon-gaussian-function",
            "children": [
                "./Continuous/normalDistribution",
                "./Continuous/normalProbabilities",
                "./Continuous/normalQuantiles",
                "./Continuous/sampleNormalDistribution"
            ]
        },
        {
            "name": "Poisson",
            "icon": "icon-fish",
            "children": [
                "./Discrete/poissonDistribution",
                "./Discrete/poissonProbabilities",
                "./Discrete/poissonQuantiles",
                "./Discrete/poissonTailProbabilities",
                "./Discrete/samplePoissonDistribution"
            ]
        },
        {
            "name": "t",
            "icon": "icon-tumblr",
            "children": [
                "./Continuous/tDistribution",
                "./Continuous/tProbabilities",
                "./Continuous/tQuantiles",
                "./Continuous/sampletDistribution"
            ]
        },
        {
            "name": "Uniform",
            "icon": "icon-rectangle",
            "children": [
                "./Continuous/uniformDistribution",
                "./Continuous/uniformProbabilities",
                "./Continuous/uniformQuantiles",
                "./Continuous/sampleUniformDistribution"
            ]
        },
        {
            "name": "Weibull",
            "icon": "icon-weibull_distribution",
            "children": [
                "./Continuous/weibullDistribution",
                "./Continuous/weibullProbabilities",
                "./Continuous/weibullQuantiles",
                "./Continuous/sampleWeibullDistribution"
            ]
        }
        

    ]           
}

module.exports.nav = nav
