
var localization = {
    en: {
        title: "Gumbel Probabilities",
        navigation: "Gumbel Probabilities",
        varvals: "Enter variable value(s) separated by a comma. Example: 3,0.5",
        location: "Location",
        scale: "Scale",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Gumbel Probabilities",
            r_help: "help(pgumbel, package=RcmdrMisc)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the Gumbel distribution with specified location and scale parameters.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dgumbel(x, location = 0, scale = 1)
                <br/>
                pgumbel(q, location=0, scale=1, lower.tail=TRUE)
                <br/>
                qgumbel(p, location=0, scale=1, lower.tail=TRUE)
                <br/>
                rgumbel(n, location=0, scale=1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles (values of the variable).</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>location : location parameter (default 0); potentially a vector.</li>
                
                
                <li>scale : scale parameter (default 1); potentially a vector.</li>
                
                <li>lower.tail : logical; if TRUE (the default) probabilities and quantiles correspond to P(X ≤ x), if FALSE to P(X > x).</li>
            </ul>            
`}        
    }
}




class gumbelProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "gumbelProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result =  RcmdrMisc::pgumbel(c({{selected.varvals | safe}}), location={{selected.location | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
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
                icon: "icon-gumbel-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new gumbelProbabilities().render()