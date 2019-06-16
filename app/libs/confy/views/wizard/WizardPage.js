// @flow
import React from "react"
import Page, {PageHeader} from "../../components/layout/Page"
import {WizardStepsContainer, WizardStepView} from "./WizardSteps"
import type {Step} from "../steps"
import {renderField} from "../../fields/fields"
import {HeaderButton} from "../../components/ui/HeaderButton"
import {Modal, onConfirm} from "../../../../components/modal/Modal"
import * as constants from "../../../../../android/app/src/main/res/constantStrings";


type WizardPagePropsFromUser = {
    onSave: <T>(string, T) => void,
    onBack: () => void,
    onSave: <T>(T) => (string) => void,
    name: string,
}

type WizardPageProps<T> = {
    config: T,
    onFieldChange: <V>(string) => (V) => void,
    steps: Array<Step>,
} & WizardPagePropsFromUser

const BaseWizardPage = ({name, onBack, children, onSave, config, header, askText}) => {
    return <Page>
        <PageHeader onBack={() => onBack()} header={header + name}>
            <HeaderButton text={constants.Save}
                          action={() => Modal.textAsk(askText, name).then(onConfirm(newName => onSave(config, newName)))}/>
        </PageHeader>
        {children}
    </Page>
}

const renderView = (View, config, onFieldChange) => (
    <View.component
        renderField={renderField(name => config[name], onFieldChange, config, name => [name])} {...View.props}
        config={config}/>
)

export const WizardPage = ({steps, name, config, onFieldChange, onSave, ...props}: WizardPageProps<*>) => (
    <BaseWizardPage onBack={props.onBack} name={name} onSave={onSave} config={config}
                    header={constants.ConfigurationNameCapitalLetter} askText={constants.EnterConfigurationpName}>
        <WizardStepsContainer>
            {
                steps.map(step => (
                    <WizardStepView key={step.name} name={step.name}>
                        {renderView(step.view, config, onFieldChange)}
                    </WizardStepView>
                ))
            }
        </WizardStepsContainer>
    </BaseWizardPage>
)

export const WizardSinglePage = ({view, name, config, onFieldChange, onSave,  ...props}: WizardPageProps<*>) => (
    <BaseWizardPage onBack={props.onBack} name={name} onSave={onSave} config={config}
                    header={constants.MaterialNameCapitalLetter} askText={constants.EnterMaterialName}>
        {renderView(view, config, onFieldChange)}
    </BaseWizardPage>
)

export const _WizardPage = WizardPage