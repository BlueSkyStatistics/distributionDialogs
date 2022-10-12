
var localization = {
    en: {
        title: "Uniform Quantiles",
        navigation: "Uniform Quantiles",
        prob: "Enter probabilities separated by a comma. Example: 0.3,0.2,0.5",
        min: "Minimum",
        max: "Maximum",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Uniform Quantiles",
            r_help: "help(qunif, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            These functions provide information about the uniform distribution on the interval from min to max. dunif gives the density, punif gives the distribution function qunif gives the quantile function and runif generates random deviates.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dunif(x, min = 0, max = 1, log = FALSE)
                <br/>
                punif(q, min = 0, max = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qunif(p, min = 0, max = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                runif(n, min = 0, max = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>min, max : lower and upper limits of the distribution. Must be finite.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail :logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            If min or max are not specified they assume the default values of 0 and 1 respectively.
            <br/>
            The uniform distribution has density
            <br/>
            <code>f(x) = 1/(max-min)</code>
            <br/>
            for min ≤ x ≤ max.
            <br/>
            For the case of u := min == max, the limit case of X == u is assumed, although there is no density in that case and dunif will return NaN (the error condition).
            <br/>
            runif will not generate either of the extreme values unless max = min or max-min is small compared to min, and in particular not for the default arguments.
            <br/>
            <br/><b>Value</b>
            <br/>
            dunif gives the density, punif gives the distribution function, qunif gives the quantile function, and runif generates random deviates.
            <br/>
            The length of the result is determined by n for runif, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            The characteristics of output from pseudo-random number generators (such as precision and periodicity) vary widely. See .Random.seed for more information on R's random number generation algorithms.            
`} 
    }
}




class uniformQuantiles extends baseModal {
    constructor() {
        var config = {
            id: "uniformQuantiles",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::qunif(c({{selected.prob | safe}}), min={{selected.min | safe}}, max={{selected.max | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: localization.en.prob,
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            min: {
                el: new input(config, {
                    no: 'min',
                    label: localization.en.min,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            max: {
                el: new input(config, {
                    no: 'max',
                    label: localization.en.max,
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
            items: [objects.prob.el.content, objects.min.el.content, objects.max.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-rectangle-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new uniformQuantiles().render()