import * as React from "react";
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';

interface optionSetProperties {
    selectedValue: number,
    optionsList: [],
    isDisabled: boolean,
    onSelectionChange: (selectedOption: any) => void

}
export default class ColoredOptionSet extends React.Component<optionSetProperties, any>{

    constructor(props: any) {
        super(props);
    }
    render() {

        return (
            <Dropdown
                disabled={this.props.isDisabled}
                placeholder="Select an option"
                options={this.props.optionsList}
                selectedKey={this.props.selectedValue}
                onChange={this.onChange.bind(this)}
                onRenderTitle={this.createCustomTitle.bind(this)}
                onRenderOption={this.createColoredOptions.bind(this)}
            />
        )

    }

    private onChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) {
        this.props.onSelectionChange(option?.key);
    }

    private createCustomTitle(options: any): JSX.Element {

        let selectedValue = options[0];

        return (
            <div>
                <span className="dot" style={{ backgroundColor: selectedValue?.data?.color }}></span> {selectedValue?.text}
            </div>
        );

    }

    private createColoredOptions(option: any): JSX.Element {
        return (
            <div>
                <span className="dot" style={{ backgroundColor: option?.data?.color }}></span> {option?.text}
            </div>
        );
    }
}