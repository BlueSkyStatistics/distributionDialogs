
var localization = {
    en: {
        title: "Binomial Probabilities",
        navigation: "Binomial Probabilities",
        size: "Binomial trials",
        prob: "Probabilities of success",
        help: {
            title: "Binomial Probabilities",
            r_help:"help(dbinom, package=stats)",
            body:`
            <b>Description</b>
            <br/>
Density, distribution function, quantile function and random generation for the binomial distribution with parameters size and prob.
<br/>
This is conventionally interpreted as the number of ‘successes’ in size trials.
<br/>
<b>Usage</b>
<br/>
<code>
    dbinom(x, size, prob, log = FALSE)
    <br/>
    pbinom(q, size, prob, lower.tail = TRUE, log.p = FALSE)
    <br/>
    qbinom(p, size, prob, lower.tail = TRUE, log.p = FALSE)
    <br/>
    rbinom(n, size, prob)
    <br/>
</code>
<br/>
<b>Arguments</b>
<br/>
<ul>
    <li>x, q : vector of quantiles.</li>
    
    
    <li>p : vector of probabilities.</li>
    
    
    <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
    
    
    <li>size : number of trials (zero or more).</li>
    
    
    <li>prob : probability of success on each trial.</li>
    
    
    <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
    
    
    <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
</ul>



<br/>
<b>Details</b>
<br/>
The binomial distribution with size = n and prob = p has density
<br/>
<code> p(x) = choose(n, x) p^x (1-p)^(n-x) </code>
<br/>
for x = 0, …, n. Note that binomial coefficients can be computed by choose in R.
<br/>
If an element of x is not integer, the result of dbinom is zero, with a warning.
<br/>
p(x) is computed using Loader's algorithm, see the reference below.
<br/>
The quantile is defined as the smallest value x such that F(x) ≥ p, where F is the distribution function.
<br/>
<br/><b>Value</b>
<br/>
dbinom gives the density, pbinom gives the distribution function, qbinom gives the quantile function and rbinom generates random deviates.
<br/>
If size is not an integer, NaN is returned.
<br/>
The length of the result is determined by n for rbinom, and is the maximum of the lengths of the numerical arguments for the other functions.
<br/>
The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
   `
        }
    }
}




class binomialProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "binomialProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
                local(
                    {
                       .Table <- data.frame(Probability=stats::dbinom(0:{{selected.size | safe}}, size={{selected.size | safe}}, prob={{selected.prob | safe}}))
                        rownames(.Table) <- (0:{{selected.size | safe}})
                        BSkyFormat(.Table, singleTableOutputHeader="Results of Binomial Probabilities")
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
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: ""
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
            }
        }
        const content = {
            items: [objects.size.el.content, objects.prob.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-binary-code-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new binomialProbabilities().render()