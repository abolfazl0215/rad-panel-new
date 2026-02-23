"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { useStays } from "../../store";
import {
  Button,
  SkeletonCard,
  ConfirmDialog,
  Pagination,
  EmptyState,
} from "../../components/UI";
import Sidebar from "../../components/Sidebar";
import StayCard from "../../components/StayCard";
import StayForm from "../../components/StayForm";
import FilterBar from "../../components/FilterBar";
import ImageGallery from "../../components/ImageGallery";

export default function StaysClient() {
  const {
    items,
    total,
    page,
    limit,
    loading,
    acting,
    fetch,
    remove,
    setPage,
    setFilters,
  } = useStays();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [gallery, setGallery] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch();
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch();
  }, [page]);

  const onFilter = useCallback(
    (f) => {
      setFilters(f);
      fetch(f);
    },
    [fetch, setFilters],
  );

  const openEdit = (item) => {
    setEditing(item);
    setFormOpen(true);
  };
  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="lg:ml-60 flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-bold text-sky-400/70 uppercase tracking-[.15em] mb-1">
              Hospitality
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Stays
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {loading
                ? "Loading…"
                : total > 0
                  ? `${total} stays`
                  : "No stays"}
            </p>
          </div>
          <Button
            icon={<Plus size={15} />}
            onClick={openNew}
            size="lg"
            className="w-full sm:w-auto">
            New Stay
          </Button>
        </header>

        <div className="mb-6">
          <FilterBar type="stays" onChange={onFilter} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            label="No stays found"
            sub="Start by adding a hotel or short-term stay"
            action={
              <Button icon={<Plus size={14} />} onClick={openNew}>
                Add Stay
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
            {items.map((item) => (
              <StayCard
                key={item._id}
                item={item}
                onEdit={() => openEdit(item)}
                onDelete={() => setDelTarget(item)}
                onGallery={() => setGallery(item)}
              />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          total={total}
          limit={limit}
          onPage={(p) => setPage(p)}
        />
      </main>

      <StayForm
        isOpen={formOpen}
        onClose={closeForm}
        editing={editing}
      />

      <ConfirmDialog
        isOpen={!!delTarget}
        title="Delete Stay"
        message={`Permanently delete "${delTarget?.title}"? This cannot be undone.`}
        loading={acting}
        onConfirm={async () => {
          if (delTarget) {
            await remove(delTarget._id);
            setDelTarget(null);
          }
        }}
        onCancel={() => setDelTarget(null)}
      />

      <ImageGallery
        isOpen={!!gallery}
        onClose={() => setGallery(null)}
        images={gallery?.images ?? []}
        title={gallery?.title}
      />
    </div>
  );
}
