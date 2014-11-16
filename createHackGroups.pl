#!/usr/bin/env perl -w
use strict;

my @hackers = (
           "GeauxHack",
           "HopHacks",
           "MHacks",
           "HackISU",
           "PennApps X",
           "HackGT",
           "Hack the North",
           "Unhackathon",
           "BigRedHacks",
           "HackPR",
           "HackUMBC",
           "Cal Hacks",
           "Hack Mizzou",
           "HackMIT",
           "HackRU",
           "BoilerMake",
           "Dubhacks",
           "hackNY",
           "HackTX",
           "Kent Hack Enough",
           "TAMUHack",
           "HackNC",
           "Bay BitHack",
           "HackCC",
           "HackHolyoke",
           "HackSC",
           "HackNJIT",
           "RamHacks",
           "AppHack",
           "Designandhack",
           "HackPrinceton",
           "RevolutionUC",
           "HackDuke",
           "HackRPI",
           "Wildhacks",
           "LocalHackDay"
);

#foreach my $hack ( @hackers ){ print $hack . "\n";}

foreach my $hack ( @hackers ){
    system "curl -X POST -H \"Content-Type: application/json\" -d '{\"name\": \"$hack\"}' https://api.groupme.com/v3/groups\?token\=eb57d1304f9301326e4e4a62284ce1cf";
}

