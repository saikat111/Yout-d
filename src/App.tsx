import React, { useState } from 'react';
import { YACHTS, DESTINATIONS } from './data/mockData';
import { AndroidFrame } from './components/AndroidFrame';
import { BottomNav, NavTab } from './components/BottomNav';
import { DiscoveryView } from './components/DiscoveryView';
import { YachtDetailView } from './components/YachtDetailView';
import { DestinationsView } from './components/DestinationsView';
import { SavedView } from './components/SavedView';
import { ProfileView } from './components/ProfileView';
import { BookingSheet } from './components/BookingSheet';
import { ComposeCodeModal } from './components/ComposeCodeModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('discover');
  const [selectedYachtId, setSelectedYachtId] = useState<string | null>(null);
  const [savedYachtIds, setSavedYachtIds] = useState<string[]>(['aurelia-78m']);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  // Toggle bookmark
  const handleToggleSave = (yachtId: string) => {
    setSavedYachtIds((prev) =>
      prev.includes(yachtId)
        ? prev.filter((id) => id !== yachtId)
        : [...prev, yachtId]
    );
  };

  // Currently viewed yacht
  const selectedYacht = selectedYachtId
    ? YACHTS.find((y) => y.id === selectedYachtId) || null
    : null;

  // Saved yachts list
  const savedYachts = YACHTS.filter((y) => savedYachtIds.includes(y.id));

  return (
    <AndroidFrame onOpenComposeInspector={() => setIsComposeModalOpen(true)}>
      {/* Screen Body Router */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {selectedYacht ? (
          /* Detailed Yacht Screen (Full Deep-dive) */
          <YachtDetailView
            yacht={selectedYacht}
            onBack={() => setSelectedYachtId(null)}
            onStartBooking={() => setIsBookingOpen(true)}
            isSaved={savedYachtIds.includes(selectedYacht.id)}
            onToggleSave={() => handleToggleSave(selectedYacht.id)}
            onViewDestination={(destId) => {
              setSelectedYachtId(null);
              setActiveTab('routes');
            }}
          />
        ) : (
          /* Bottom Navigation Tabs */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {activeTab === 'discover' && (
              <DiscoveryView
                yachts={YACHTS}
                destinations={DESTINATIONS}
                onSelectYacht={(id) => setSelectedYachtId(id)}
                onSelectDestination={(destId) => setActiveTab('routes')}
                savedYachtIds={savedYachtIds}
                onToggleSave={handleToggleSave}
              />
            )}

            {activeTab === 'routes' && (
              <DestinationsView
                destinations={DESTINATIONS}
                yachts={YACHTS}
                onSelectYacht={(id) => setSelectedYachtId(id)}
              />
            )}

            {activeTab === 'saved' && (
              <SavedView
                savedYachts={savedYachts}
                onSelectYacht={(id) => setSelectedYachtId(id)}
                onRemoveSaved={(id) => handleToggleSave(id)}
                onExploreFleet={() => setActiveTab('discover')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                onOpenComposeInspector={() => setIsComposeModalOpen(true)}
              />
            )}

            {/* Android Bottom Navigation Bar */}
            <BottomNav
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setSelectedYachtId(null);
              }}
              savedCount={savedYachtIds.length}
            />
          </div>
        )}

        {/* Charter Booking Bottom Sheet (Android Modal Sheet) */}
        {selectedYacht && (
          <BookingSheet
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            yacht={selectedYacht}
          />
        )}

        {/* Jetpack Compose Architecture Modal */}
        <ComposeCodeModal
          isOpen={isComposeModalOpen}
          onClose={() => setIsComposeModalOpen(false)}
        />
      </div>
    </AndroidFrame>
  );
}
