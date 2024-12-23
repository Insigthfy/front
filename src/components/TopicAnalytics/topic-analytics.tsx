"use client";

import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
import TopicHeader from "../TopicHeader/topic-header";
import { ITopic } from "@/types/topic";
import { analyzeResponses } from "@/services/analyze-responses";
import Loading from "../../../public/loading.gif";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IAnalyzedResponse } from "@/types/analyzed-response";

type FeedbackType =
  | "Bem Negativo"
  | "Negativo"
  | "Neutro"
  | "Positivo"
  | "Bem Positivo";

function TopicAnalytics({
  id,
  name,
  description,
  survey,
  loading,
}: ITopic & { loading: boolean }) {
  const topicFeedback: Record<FeedbackType, JSX.Element> = {
    "Bem Negativo": <ChevronsDown size={22.5} className="text-insightfy-red" />,
    Negativo: <ChevronDown size={22.5} className="text-insightfy-red" />,
    Neutro: <ChevronsUpDown size={22.5} />,
    Positivo: <ChevronUp size={22.5} className="text-insightfy-green" />,
    "Bem Positivo": <ChevronsUp size={22.5} className="text-insightfy-green" />,
  };

  const [responses, setResponses] = useState<IAnalyzedResponse[]>([]);

  useEffect(() => {
    const fetchResponses = async () => {
      const res = await analyzeResponses(id);
      console.log(res);

      setResponses(res);
    }

    fetchResponses();
  }, []);

  return loading ? (
    <Image src={Loading.src} alt="Loading GIF" width={100} height={100} />
  ) : (
    <section className="w-full flex flex-col gap-6">
      <TopicHeader name={name} description={description} />

      <div className="flex justify-between">
        <p>{responses.length} respostas</p>

        {Object.entries(topicFeedback).map(([feedback, icon]) => (
          <span className="items-center gap-2 lg:flex hidden" key={feedback}>
            {icon}
            <p className="text-sm">{feedback}</p>
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {responses.map((response, index) => (
          <div
            className="flex flex-col gap-3 border-b border-insightfy-gray px-2 py-6"
            key={index}
          >
            <div className="flex items-center gap-2">
              {topicFeedback[response.grade as FeedbackType]}
              <p className="text-xs text-insightfy-border">
                Aug 14, 2024, 09:41 AM - {response.grade}
              </p>
            </div>
            <p className="text-sm">{response.response}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopicAnalytics;
