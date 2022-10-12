
var localization = {
    en: {
        title: "Poisson Distribution Plot",
        navigation: "Poisson Distribution Plot",
        lambda: "Mean",
        plotProb: "Plot probability mass function",
        plotDistrib: "Plot distribution function",
        help: {
            title: "Poisson Distribution Plot",
            r_help: "help(qpois, package=stats)",
            body: `

            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the Poisson distribution with parameter lambda.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dpois(x, lambda, log = FALSE)
                <br/>
                ppois(q, lambda, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qpois(p, lambda, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rpois(n, lambda)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x : vector of (non-negative integer) quantiles.</li>
                
                
                <li>q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of random values to return.</li>
                
                
                <li>lambda : vector of (non-negative) means.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The Poisson distribution has density
            <br/>
            <code>p(x) = λ^x exp(-λ)/x!</code>
            <br/>
            for x = 0, 1, 2, … . The mean and variance are E(X) = Var(X) = λ.
            <br/>
            Note that λ = 0 is really a limit case (setting 0^0 = 1) resulting in a point mass at 0, see also the example.
            <br/>
            If an element of x is not integer, the result of dpois is zero, with a warning. p(x) is computed using Loader's algorithm, see the reference in dbinom.
            <br/>
            The quantile is right continuous: qpois(p, lambda) is the smallest integer x such that P(X ≤ x) ≥ p.
            <br/>
            Setting lower.tail = FALSE allows to get much more precise results when the default, lower.tail = TRUE would return 1, see the example below.
            <br/>
            <br/><b>Value</b>
            <br/>
            dpois gives the (log) density, ppois gives the (log) distribution function, qpois gives the quantile function, and rpois generates random deviates.
            <br/>
            Invalid lambda will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rpois, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.            
`}
    }
}




class poissonDistributionPlot extends baseModal {
    constructor() {
        var config = {
            id: "poissonDistributionPlot",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000, the lower and upper bounds of the sequence are computed using the quantile function of the Poisson distribution  (qpois)  with p=0.0005 and p=0.9995 respectively 
                    lowProbBound =0.0005
                    upperProbBound=0.9995
                    lowerbound =qpois(p=lowProbBound, lambda={{selected.lambda | safe}})
                    upperbound =qpois(p=upperProbBound,  lambda={{selected.lambda | safe}})
                    .x <- round(seq(lowerbound, upperbound, length.out=1000) )
                if({{selected.a | safe}})
                {
                    RcmdrMisc::plotDistr(.x, stats::dpois(.x,  lambda={{selected.lambda | safe}}), xlab="x", 
                    ylab="Probability Mass", 
                    main="Poisson  Distribution:   
                    Mean={{selected.lambda | safe}}",   discrete=TRUE)
                }
                else
                {
                    RcmdrMisc::plotDistr(.x, stats::ppois(.x, lambda={{selected.lambda | safe}}), xlab="x",
                    ylab="Cumulative Probability", 
                    main="Poisson  Distribution:  
                    Mean={{selected.lambda | safe}}",   discrete=TRUE, cdf=TRUE)
                }
                
                }
                )                            
                `
        }
        var objects = {
            lambda: {
                el: new input(config, {
                    no: 'lambda',
                    label: localization.en.lambda,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            plotProb: { el: new radioButton(config, { label: localization.en.plotProb, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotDistrib: { el: new radioButton(config, { label: localization.en.plotDistrib, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.lambda.el.content, objects.plotProb.el.content, objects.plotDistrib.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-fish-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new poissonDistributionPlot().render()