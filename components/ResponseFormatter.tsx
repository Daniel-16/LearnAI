interface ResponseFormatterProps {
    response: string,
    isLoading?: boolean,
}

export const ResponseFormatter = ({ response, isLoading }: ResponseFormatterProps) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
        )
    }
    return (
        <div className="bg-card rounded-lg p-6 shadow-lg">
        <div className="prose prose-sm max-w-none">
          {response.split('\n').map((line, index) => {
            // Handle bold text
            if (line.startsWith('**') && line.endsWith('**')) {
              return <strong key={index}>{line.slice(2, -2)}</strong>;
            }
            // Handle bullet points
            if (line.startsWith('* ')) {
              return (
                <ul key={index} className="list-disc ml-4">
                  <li>{line.slice(2)}</li>
                </ul>
              );
            }
            // Regular text
            return <p key={index}>{line}</p>;
          })}
        </div>
      </div>
    )
}