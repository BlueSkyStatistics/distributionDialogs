
var localization = {
    en: {
        title: "Normal Probabilities",
        navigation: "Normal Probabilities",
        varvals: "Enter variable value(s) separated by a comma. Example: 3,0.5",
        mean: "Mean",
        sd: "Standard deviation",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Normal Probabilities",
            r_help: "help(pnorm, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the normal distribution with mean equal to mean and standard deviation equal to sd.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dnorm(x, mean = 0, sd = 1, log = FALSE)
                <br/>
                pnorm(q, mean = 0, sd = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qnorm(p, mean = 0, sd = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rnorm(n, mean = 0, sd = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>mean : vector of means.</li>
                
                
                <li>sd : vector of standard deviations.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x] otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            If mean or sd are not specified they assume the default values of 0 and 1, respectively.
            <br/>
            The normal distribution has density
            <br/>
            <code>f(x) = 1/(√(2 π) σ) e^-((x - μ)^2/(2 σ^2))</code>
            <br/>
            where μ is the mean of the distribution and σ the standard deviation.
            <br/>
            <br/><b>Value</b>
            <br/>
            dnorm gives the density, pnorm gives the distribution function, qnorm gives the quantile function, and rnorm generates random deviates.
            <br/>
            The length of the result is determined by n for rnorm, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            For sd = 0 this gives the limit as sd decreases to 0, a point mass at mu. sd < 0 is an error and returns NaN.            
`}
    }
}




class normalProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "normalProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::pnorm(c({{selected.varvals | safe}}), mean={{selected.mean | safe}}, sd={{selected.sd | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: localization.en.varvals,
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            mean: {
                el: new input(config, {
                    no: 'mean',
                    label: localization.en.mean,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sd: {
                el: new input(config, {
                    no: 'sd',
                    label: localization.en.sd,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: localization.en.labelSig, style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: localization.en.lowtail, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: localization.en.uptail, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.mean.el.content, objects.sd.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-gaussian-function-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new normalProbabilities().render()