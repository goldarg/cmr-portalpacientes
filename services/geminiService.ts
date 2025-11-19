import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    // Safe check for environment variable
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("Gemini API Key is missing. AI features will be disabled.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const summarizeMedicalReport = async (reportText: string): Promise<string> => {
    const ai = getClient();
    if (!ai) {
        return "La función de IA no está disponible (API Key faltante).";
    }

    try {
        const model = "gemini-2.5-flash";
        const prompt = `
        Actúa como un asistente médico útil para pacientes. 
        Resume el siguiente informe médico en un lenguaje claro y sencillo (lenguaje llano) 
        para que un paciente sin conocimientos médicos pueda entenderlo. 
        Evita jerga técnica innecesaria o explícala si es vital. 
        Mantén un tono tranquilizador pero profesional.
        
        Informe: "${reportText}"
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text || "No se pudo generar el resumen.";
    } catch (error) {
        console.error("Error generating summary with Gemini:", error);
        return "Ocurrió un error al intentar resumir el informe. Por favor intente más tarde.";
    }
};