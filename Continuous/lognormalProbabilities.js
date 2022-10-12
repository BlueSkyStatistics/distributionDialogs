
var localization = {
    en: {
        title: "Lognormal Probabilities",
        navigation: "Lognormal Probabilities",
        varvals: "Enter variable value(s) separated by a comma. Example: 3,0.5",
        meanlog: "Mean (log scale)",
        sdlog: "Standard deviation (log scale)",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Lognormal Probabilities",
            r_help: "help(plnorm, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the log normal distribution whose logarithm has mean equal to meanlog and standard deviation equal to sdlog.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dlnorm(x, meanlog = 0, sdlog = 1, log = FALSE)
                <br/>
                plnorm(q, meanlog = 0, sdlog = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qlnorm(p, meanlog = 0, sdlog = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rlnorm(n, meanlog = 0, sdlog = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>meanlog, sdlog : mean and standard deviation of the distribution on the log scale with default values of 0 and 1 respectively.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The log normal distribution has density
            <br/>
            <code>f(x) = 1/(√(2 π) σ x) e^-((log x - μ)^2 / (2 σ^2))</code>
            <br/>
            where μ and σ are the mean and standard deviation of the logarithm. The mean is E(X) = exp(μ + 1/2 σ^2), the median is med(X) = exp(μ), and the variance Var(X) = exp(2*μ + σ^2)*(exp(σ^2) - 1) and hence the coefficient of variation is sqrt(exp(σ^2) - 1) which is approximately σ when that is small (e.g., σ < 1/2).
            <br/>
            <br/><b>Value</b>
            <br/>
            dlnorm gives the density, plnorm gives the distribution function, qlnorm gives the quantile function, and rlnorm generates random deviates.
            <br/>
            The length of the result is determined by n for rlnorm, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            The cumulative hazard H(t) = - log(1 - F(t)) is -plnorm(t, r, lower = FALSE, log = TRUE).            
`}
    }
}




class lognormalProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "lognormalProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::plnorm(c({{selected.varvals | safe}}), meanlog={{selected.meanlog | safe}}, sdlog={{selected.sdlog | safe}}, lower.tail={{selected.a | safe}} )
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
            meanlog: {
                el: new input(config, {
                    no: 'meanlog',
                    label: localization.en.meanlog,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sdlog: {
                el: new input(config, {
                    no: 'sdlog',
                    label: localization.en.sdlog,
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
            items: [objects.varvals.el.content, objects.meanlog.el.content, objects.sdlog.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-log-normal-distribution-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new lognormalProbabilities().render()