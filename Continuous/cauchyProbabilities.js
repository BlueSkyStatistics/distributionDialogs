
var localization = {
    en: {
        title: "Cauchy Probabilities",
        navigation: "Cauchy Probabilities",
        varvals: "Enter variable value(s) separated by a comma. Example: 3,0.5",
        location: "Location",
        scale: "Scale",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Cauchy Probabilities",
            r_help: "help(pcauchy, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the Cauchy distribution with location parameter location and scale parameter scale.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dcauchy(x, location = 0, scale = 1, log = FALSE)
                <br/>
                pcauchy(q, location = 0, scale = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qcauchy(p, location = 0, scale = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rcauchy(n, location = 0, scale = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>location, scale : location and scale parameters.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            If location or scale are not specified, they assume the default values of 0 and 1 respectively.
            <br/>
            The Cauchy distribution with location l and scale s has density
            <br/>
            <code>f(x) = 1 / (π s (1 + ((x-l)/s)^2))</code>
            for all x.
            <br/>
            <br/><b>Value</b>
            <br/>
            dcauchy, pcauchy, and qcauchy are respectively the density, distribution function and quantile function of the Cauchy distribution. rcauchy generates random deviates from the Cauchy.
            <br/>
            The length of the result is determined by n for rcauchy, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <b>Source</b>
            <br/>
            dcauchy, pcauchy and qcauchy are all calculated from numerically stable versions of the definitions.
            <br/>
            rcauchy uses inversion.            
`}

    }
}




class cauchyProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "cauchyProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pcauchy(c({{selected.varvals | safe}}), location={{selected.location | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
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
            location: {
                el: new input(config, {
                    no: 'location',
                    label: localization.en.location,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            scale: {
                el: new input(config, {
                    no: 'scale',
                    label: localization.en.scale,
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
            items: [objects.varvals.el.content, objects.location.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-c-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new cauchyProbabilities().render()