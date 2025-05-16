import {Button} from "@/components/ui/button";


export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="flex justify-center items-center flex-wrap gap-2 mt-6">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
  
        {pages.map((page) => (
          <Button
            key={page}
            size="sm"
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
  
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    );
  }