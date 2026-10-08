import React, { useState } from 'react';
import { X, Copy, Check, FileCode2, Layers, Cpu, Smartphone } from 'lucide-react';

interface ComposeCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComposeCodeModal: React.FC<ComposeCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'detail' | 'discovery' | 'theme' | 'viewmodel'>('detail');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const codeSnippets = {
    detail: `// Pelagos Yacht & Travel Mobile - Jetpack Compose
// Presentation Layer: YachtDetailScreen.kt
package com.pelagos.luxury.ui.detail

import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.unit.dp
import com.pelagos.luxury.domain.model.Yacht
import com.pelagos.luxury.ui.theme.PelagosTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun YachtDetailScreen(
    yacht: Yacht,
    onNavigateBack: () -> Unit,
    onBookCharterClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()
    var isSaved by remember { mutableStateOf(false) }

    Scaffold(
        modifier = modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            PelagosCollapsingTopBar(
                title = yacht.name,
                scrollBehavior = scrollBehavior,
                onBack = onNavigateBack,
                isSaved = isSaved,
                onToggleSaved = { isSaved = !isSaved }
            )
        },
        bottomBar = {
            PelagosCharterBookingBar(
                ratePerWeek = yacht.weeklyRateEuros,
                onInquireCharter = onBookCharterClick
            )
        },
        containerColor = PelagosTheme.colorScheme.background
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            item(key = "gallery_pager") {
                YachtHeroGalleryPager(
                    images = yacht.galleryImages,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(340.dp)
                )
            }

            item(key = "specs_grid") {
                YachtKeyMetricsRow(
                    lengthMeters = yacht.lengthMeters,
                    guests = yacht.guests,
                    crew = yacht.crew,
                    cabins = yacht.cabins
                )
            }

            item(key = "naval_heritage") {
                NavalArchitectureSection(
                    builder = yacht.builder,
                    year = yacht.yearBuilt,
                    cruisingSpeed = yacht.cruisingSpeedKnots,
                    maxSpeed = yacht.maxSpeedKnots
                )
            }

            item(key = "amenities_deck") {
                InteractiveDeckPlanSection(deckPlans = yacht.deckPlans)
            }
        }
    }
}`,
    discovery: `// Presentation Layer: DiscoveryScreen.kt
package com.pelagos.luxury.ui.discovery

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.pelagos.luxury.ui.components.YachtHeroCard
import com.pelagos.luxury.ui.components.CategoryFilterSegment

@Composable
fun DiscoveryScreen(
    onYachtSelected: (String) -> Unit,
    onDestinationSelected: (String) -> Unit,
    viewModel: DiscoveryViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(bottom = 96.dp)
    ) {
        item(key = "discovery_header") {
            AtelierHeader(
                title = "PELAGOS",
                subtitle = "Bespoke Charters & Trans-Oceanic Expeditions"
            )
        }

        item(key = "fleet_filters") {
            CategoryFilterSegment(
                categories = uiState.categories,
                selected = uiState.selectedCategory,
                onSelect = viewModel::selectCategory
            )
        }

        items(
            items = uiState.filteredYachts,
            key = { it.id }
        ) { yacht ->
            YachtFeaturedCard(
                yacht = yacht,
                onClick = { onYachtSelected(yacht.id) },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 10.dp)
            )
        }
    }
}`,
    theme: `// Design System & Material 3: PelagosTheme.kt
package com.pelagos.luxury.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val PelagosObsidian = Color(0xFF080C14)
val PelagosMidnight = Color(0xFF0E1626)
val PelagosChampagneGold = Color(0xFFC5A880)
val PelagosWarmSand = Color(0xFFE8DCC4)
val PelagosSurfaceElevated = Color(0xFF131D30)

private val PelagosDarkColorScheme = darkColorScheme(
    primary = PelagosChampagneGold,
    onPrimary = PelagosObsidian,
    primaryContainer = PelagosMidnight,
    onPrimaryContainer = PelagosWarmSand,
    background = PelagosObsidian,
    surface = PelagosMidnight,
    surfaceVariant = PelagosSurfaceElevated,
    onSurface = Color(0xFFF1F5F9),
    outline = Color(0x1FFFFFFF)
)

@Composable
fun PelagosTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = PelagosDarkColorScheme,
        typography = PelagosTypography,
        shapes = PelagosShapes,
        content = content
    )
}`,
    viewmodel: `// Architectural Layer: CharterViewModel.kt
package com.pelagos.luxury.ui.booking

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import javax.inject.Inject

@HiltViewModel
class CharterBookingViewModel @Inject constructor(
    private val charterRepository: CharterRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(CharterBookingUiState())
    val uiState = _uiState.asStateFlow()

    fun updateCharterDates(start: String, end: String) {
        _uiState.update { it.copy(startDate = start, endDate = end) }
    }

    fun submitInquiry(yachtId: String, clientNotes: String) {
        _uiState.update { it.copy(isSubmitting = true) }
        // Emits booking state to broker concierge
    }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md antialiased">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E1524] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090E1A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
                Android Jetpack Compose Architecture
                <span className="text-[11px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Kotlin 2.0 · M3 Expressive
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Production-grade Android presentation layer, unidirectional data flow, and Material 3 design tokens.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#0A101C] border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('detail')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'detail'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              YachtDetailScreen.kt
            </button>
            <button
              onClick={() => setActiveTab('discovery')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'discovery'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              DiscoveryScreen.kt
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'theme'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              PelagosTheme.kt
            </button>
            <button
              onClick={() => setActiveTab('viewmodel')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'viewmodel'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              CharterViewModel.kt
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-mono"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Kotlin</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#060A12] font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 selection:bg-amber-500/30">
          <pre className="overflow-x-auto whitespace-pre font-mono text-slate-200">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#090E1A] flex items-center justify-between text-xs text-slate-400">
          <span>Target SDK 35 (Android 15) · Material Design 3 Expressive · Compose Compiler 1.5.15</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
