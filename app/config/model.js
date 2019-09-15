// @flow
import {DBModel, MainModel} from "../libs/confy/models"
import {OptionField} from "../libs/confy/fields/options/optionField"
import {TextField} from "../libs/confy/fields/text/textField"
import {BoolField} from "../libs/confy/fields/switch/boolField"
import {ImageMultiChooserField, MultiChooserField} from "../libs/confy/fields/multiOptions/multiOptionField"
import {ObjectField} from "../libs/confy/fields/object/ObjectField"
import * as R from "ramda"
import {ImagePickerField} from "../libs/confy/fields/imagePicker/ImagePickerField"
import {IntegerField} from "../libs/confy/fields/integer/IntegerField"
import {MaterialsArrayField, MaterialsArrayInput} from "../pages/confyViews/materials/MaterialsField"
import {ForeignField} from "../libs/confy/fields/foreign/foreignField"
import {SimpleCheckbox} from "../pages/confyViews/materials/SimpleCheckbox"
import {get, getChildProp, getSiblingProp} from "../libs/confy/fields/dynamic/traversing"
import TestObjectInput from "../pages/confyViews/testObjectPage/TestObjectInput"
import * as constants from "../../android/app/src/main/res/constantStrings";
import {fontStyles as fontStyle} from "../../android/app/src/main/res/fontStyle";
import {IntegerFieldWithInformation} from "../libs/confy/fields/integer/IntegerFieldWithInformation";

export const WordModel = DBModel("words", {
    name: TextField(constants.Word),
    tags: TextField(constants.Categories),
    images: ImagePickerField(constants.Images)
})

export const ConfigurationModel = MainModel({
    materials: MaterialsArrayField({
        word: ForeignField(constants.SelectedWord, WordModel),
        isInLearningMode: BoolField(constants.InLearning, {component: SimpleCheckbox, def: true}),
        isInTestMode: BoolField(constants.InTest, {component: SimpleCheckbox, def: true}),
        images: ImageMultiChooserField(constants.ChooseVisualMaterials, undefined, (obj, path) => ({
                options: R.pipe(
                    getSiblingProp("word"),
                    getChildProp("images"),
                    get
                )(path)(obj)
            })
        )
    }),
    hintType: MultiChooserField(constants.TypeOfHint, {
        options: [
            constants.GrayedOut,
            constants.Enlarge,
            constants.Lack
        ],
        def: [
            constants.GrayedOut
        ],
        info: ""
    }),
    commandText: OptionField(constants.TypeOfCommand, {
        options: [
            constants.WhereIs + "{" + constants.Word + "}",
            constants.ShowWhereIs + "{" + constants.Word + "}",
            "{" + constants.Word + "}",
        ]
    }),
    picturesNumber: IntegerField(constants.NumberOfPictures, {min: 1, max: 6, def: 3}),
    showPicturesLabels: BoolField(constants.ShowLabelUnderPictures, {def: true}),
    isReadingCommands: BoolField(constants.ReadingCommands, {def: true}),
    showHintAfter: IntegerField(constants.TimeToShowTheHints, {min: 1, max: 20, def: 5, units: "s"}),
    numberOfRepetitions: IntegerFieldWithInformation(constants.NumberOfRepetitions, {min: 1, max: 20, def: 3, info: constants.NumberOfRepetitionInformation}),
    textRewards: MultiChooserField(constants.ChooseVerbalPraise, {
        options: [
            constants.Fantastic,
            constants.Cool,
            constants.Extra,
            constants.Revelation,
            constants.Great,
            constants.Good
        ],
        def: [
            constants.Cool,
            constants.Great,
            constants.Good
        ],
        info : constants.ChooseVerbalPraiseInformation
    }),
    isReadingRewards: BoolField(constants.VoiceReadingOfRewards),
    animationRewards: ImageMultiChooserField(constants.ChooseAnimatedRewards, {
        options: [
            {uri: "http://via.placeholder.com/350x350"},
            {uri: "http://via.placeholder.com/350x351"},
            {uri: "http://via.placeholder.com/351x350"}
        ]
    }),
    testConfig: ObjectField(constants.TestConfiguration, {
        numberOfRepetitions: IntegerFieldWithInformation(constants.NumberOfRepetitions, {min: 1, max: 20, def: 3, info: constants.NumberOfRepetitionInformation}),
        timeForAnswer: IntegerField(constants.TimeForAnswer, {min: 1, max: 10, def: 5, units: "s"})
    }, undefined, TestObjectInput)
})
