
var localization = {
    en: {
        title: "Negative Binomial Distribution Plot",
        navigation: "Negative Binomial Distribution Plot",
        size: "Target number of successes",
        prob: "Probabilities of success",
        plotProb: "Plot probability mass function",
        plotDistrib: "Plot distribution function",
        help: {
            title: "Negative Binomial Distribution Plot",
            r_help: "help(qnbinom, package=stats)",
            body: `

            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the negative binomial distribution with parameters size and prob.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dnbinom(x, size, prob, mu, log = FALSE)
                <br/>
                pnbinom(q, size, prob, mu, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qnbinom(p, size, prob, mu, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rnbinom(n, size, prob, mu)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x : vector of (non-negative integer) quantiles.</li>
                
                
                <li>q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>size : target for number of successful trials, or dispersion parameter (the shape parameter of the gamma mixing distribution). Must be strictly positive, need not be integer.</li>
                
                
                <li>prob : probability of success in each trial. 0 < prob <= 1.</li>
                
                
                <li>mu : alternative parametrization via mean: see ‘Details’.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The negative binomial distribution with size = n and prob = p has density
            <br/>
            <code>
                Γ(x+n)/(Γ(n) x!) p^n (1-p)^x
                for x = 0, 1, 2, …, n > 0 and 0 < p ≤ 1.
            </code>
            <br/>
            This represents the number of failures which occur in a sequence of Bernoulli trials before a target number of successes is reached. The mean is μ = n(1-p)/p and variance n(1-p)/p^2.
            <br/>
            A negative binomial distribution can also arise as a mixture of Poisson distributions with mean distributed as a gamma distribution (see pgamma) with scale parameter (1 - prob)/prob and shape parameter size. (This definition allows non-integer values of size.)
            <br/>
            An alternative parametrization (often used in ecology) is by the mean mu (see above), and size, the dispersion parameter, where prob = size/(size+mu). The variance is mu + mu^2/size in this parametrization.
            <br/>
            If an element of x is not integer, the result of dnbinom is zero, with a warning.
            The case size == 0 is the distribution concentrated at zero. This is the limiting distribution for size approaching zero, even if mu rather than prob is held constant. Notice though, that the mean of the limit distribution is 0, whatever the value of mu.
            <br/>
            The quantile is defined as the smallest value x such that F(x) ≥ p, where F is the distribution function.
            <br/>
            <br/><b>Value</b>
            <br/>
            dnbinom gives the density, pnbinom gives the distribution function, qnbinom gives the quantile function, and rnbinom generates random deviates.
            <br/>
            Invalid size or prob will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rnbinom, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.            
`}
    }
}




class negativeBinomialDistributionPlot extends baseModal {
    constructor() {
        var config = {
            id: "negativeBinomialDistributionPlot",
            label: localization.en.title,
            modalType: "one",
            RCode: `
                local(
                    {
                    #Generating the sequence of length 1000, the lower and upper bounds of the sequence are computed using the quantile function of the  Negative Binomial distribution  (qnbinom)  with p=0.0005 and p=0.9995 respectively 
                        lowProbBound =0.0005
                        upperProbBound=0.9995
                        lowerbound =qnbinom(p=lowProbBound, size={{selected.size | safe}}, prob={{selected.prob | safe}})
                        upperbound =qnbinom(p=upperProbBound, size={{selected.size | safe}}, prob={{selected.prob | safe}})
                        .x <- round(seq(lowerbound, upperbound, length.out=1000) )
                    if({{selected.a | safe}})
                    {
                        RcmdrMisc::plotDistr(.x, stats::dnbinom(.x, size={{selected.size | safe}}, prob={{selected.prob | safe}}), xlab="Number of Failures Until Target Successes", 
                        ylab="Probability Mass", 
                        main="Negative Binomial Distribution:  Trials={{selected.size | safe}}, 
                        Probability of success={{selected.prob | safe}}",   discrete=TRUE)
                    }
                    else
                    {
                    RcmdrMisc::plotDistr(.x, stats::pnbinom(.x, size={{selected.size | safe}}, {{selected.prob | safe}}), xlab="Number of Failures Until Target Successes",
                        ylab="Cumulative Probability", 
                        main="Negative Binomial Distribution:  Trials={{selected.size | safe}}, 
                        Probability of success={{selected.prob | safe}}",   discrete=TRUE, cdf=TRUE)
                    }
                    
                    }
                    )                        
                `
        }
        var objects = {
            size: {
                el: new input(config, {
                    no: 'size',
                    label: localization.en.size,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: localization.en.prob,
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            
            plotProb: { el: new radioButton(config, { label: localization.en.plotProb, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotDistrib: { el: new radioButton(config, { label: localization.en.plotDistrib, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.size.el.content, objects.prob.el.content, objects.plotProb.el.content, objects.plotDistrib.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-negtive-binary-code-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new negativeBinomialDistributionPlot().render()