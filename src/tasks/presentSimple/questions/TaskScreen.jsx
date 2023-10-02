// Context and hooks
import { useLang } from "../../../contexts/LangContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
// Data and utils
import { LOCAL_STORAGE_KEY as KEY } from "../../../config/localStorageConfig";
import { config } from "../../../config/config";
import { langPack } from "../../../data/langPack";
// Components
import TaskScreenWrapper from "../../../features/taskScreen/TaskScreenWrapper";
import TaskScreenHeadings from "../../../features/taskScreen/TaskScreenHeadings";
import TaskScreenSettings from "../../../features/taskScreen/TaskScreenSettings";
import TaskScreenRange from "../../../features/taskScreen/TaskScreenRange";
import TaskScreenButtons from "../../../features/taskScreen/TaskScreenButtons";
import Button from "../../../components/ui/Button";

import { testPhraseQuestions } from "../../../data/mockQuestions";
import { getShuffledArrayCopy } from "../../../utils/helpers";
import TaskScreenCheckboxes from "../../../features/taskScreen/TaskScreenCheckboxes";

function TaskScreen() {
    const { lang } = useLang();
    const { dispatch } = useQuiz();

    const [amount, setAmount] = useLocalStorageState(
        KEY.questionsAmount,
        config.quistionsAmount.default
    );

    function handleStartQuiz() {
        dispatch({
            type: "quiz/started",
            payload: { questions: getShuffledArrayCopy(testPhraseQuestions) },
        });
    }

    return (
        <TaskScreenWrapper>
            <TaskScreenHeadings>
                <h2>
                    {
                        {
                            ru: "Аглийские вопросы",
                            en: "English questions",
                        }[lang]
                    }
                </h2>

                <h3>
                    {
                        {
                            ru: "простое время",
                            en: "simple tense",
                        }[lang]
                    }
                </h3>
            </TaskScreenHeadings>

            <TaskScreenSettings>
                <TaskScreenRange
                    title={
                        {
                            ru: "количество вопросов:",
                            en: "questions amount:",
                        }[lang]
                    }
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                ></TaskScreenRange>

                <TaskScreenCheckboxes
                    title={{ en: "Tense:", ru: "Время:" }[lang]}
                    options={["past simple", "present simple", "future simple"]}
                    labels={
                        {
                            en: [
                                "past simple",
                                "present simple",
                                "future simple",
                            ],
                            ru: [
                                "прошедшее простое",
                                "настоящее простое",
                                "будущее простое",
                            ],
                        }[lang]
                    }
                    selectedOptions={[
                        "past simple",
                        "present simple",
                        "future simple",
                    ]}
                    onChange={() => {}}
                />
            </TaskScreenSettings>

            <TaskScreenButtons>
                <Button onClick={handleStartQuiz}>
                    {langPack.buttons.start[lang]}
                </Button>
            </TaskScreenButtons>
        </TaskScreenWrapper>
    );
}

export default TaskScreen;
