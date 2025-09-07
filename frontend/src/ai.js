import Vapi from "@vapi-ai/web"

//accessing environment variable from react
export const vapi = new Vapi(import.meta.env.VITE_VAPI_API_KEY)
const assistantId = import.meta.env.VITE_ASSISTANT_ID

export const startAssistant = async(firstName, lastName, phone) => {
    const assistantOverrides = {
        variableValues: {
            firstName,
            lastName,
            phone
        }
    }
    return await vapi.start(assistantId, assistantOverrides)
}

export const stopAssistant = () => {
    vapi.stop()
}