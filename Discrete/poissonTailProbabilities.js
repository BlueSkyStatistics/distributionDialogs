
var localization = {
    en: {
        title: "Poisson Tail Probabilities",
        navigation: "Poisson Tail Probabilities",
        varvals: "Enter variable value(s) separated by a comma. Example: 3,0.5",
        lambda: "Mean",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Poisson Tail Probabilities",
            r_help: "help(ppois, package=stats)",
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




class poissonTailProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "poissonTailProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::ppois(c({{selected.varvals | safe}}), lambda={{selected.lambda | safe}}, lower.tail={{selected.a | safe}} )
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
            labelSig: { el: new labelVar(config, { label: localization.en.labelSig, style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: localization.en.lowtail, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: localization.en.uptail, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.lambda.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-fish-t",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new poissonTailProbabilities().render()